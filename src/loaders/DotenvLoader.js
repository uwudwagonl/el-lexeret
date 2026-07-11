import TextLoader from "./TextLoader.js";

import ObjectUtil from "../util/ObjectUtil.js";

import DotenvParser from "../parsers/dotenv/DotenvParser.js";

import { LoadStatus } from "./LoadStatus.js";

class DotenvLoader extends TextLoader {
    constructor(name, filePath, logger, options) {
        options = ObjectUtil.guaranteeObject(options);

        super(name, filePath, logger, {
            type: "dotenv_file",
            ...options
        });

        this.sync = options.sync ?? false;
        this.override = options.override ?? false;

        this.processEnv = ObjectUtil.guaranteeObject(options.processEnv ?? process.env);
    }

    load() {
        const res = super.load();

        if (this.sync) {
            if (res === LoadStatus.failed) {
                return res;
            }

            return this._loadDotenv();
        } else {
            return res.then(status => {
                if (status === LoadStatus.failed) {
                    return status;
                }

                return this._loadDotenv();
            });
        }
    }

    write() {
        return this.failure(`Writing ${this.getName()} is not supported`);
    }

    _parse() {
        try {
            this.data = DotenvParser.parse(this._dotenvString);
            return LoadStatus.successful;
        } catch (err) {
            return this.failure(err, `Error occured while parsing ${this.getName()}:`);
        }
    }

    _loadDotenv() {
        this._dotenvString = this.data;
        this.data = null;

        const status = this._parse();

        if (status === LoadStatus.failed) {
            return status;
        }

        this.data = DotenvParser.populate(
            {
                ...this.processEnv
            },
            this.data,
            {
                override: this.override
            }
        );

        return LoadStatus.successful;
    }
}

export default DotenvLoader;
