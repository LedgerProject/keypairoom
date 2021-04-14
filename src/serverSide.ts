import { zencode_exec } from "zenroom";
import { readStringFromFile } from "./service/fileService";
import * as dotenv from "dotenv";
const DEFAULT_SERVER_SIDE_CONTRACT =
  "./node_modules/keypair-lib/lib/zencode/Keypair-Creation-Server-Side.zen";

export async function createPBKDF(userData: any) {
  dotenv.config();
  const serverSideContract = process.env.SERVER_SIDE_CONTRACT
    ? process.env.SERVER_SIDE_CONTRACT
    : DEFAULT_SERVER_SIDE_CONTRACT;
  const SERVER_SIDE_CONTRACT = readStringFromFile(serverSideContract);

  const keys: any = {
    theBackend: {
      keypair: {
        private_key: process.env.BACKEND_PRIVATE_KEY,
        public_key: process.env.BACKEND_PUBLIC_KEY,
      },
    },
    theBackendPassword: process.env.BACKEND_PASSWORD,
    userData,
  };
  const data: any = {};

  const execution: any = await zencode_exec(SERVER_SIDE_CONTRACT, {
    data: JSON.stringify(data),
    keys: JSON.stringify(keys),
  });

  return JSON.parse(execution.result);
}
