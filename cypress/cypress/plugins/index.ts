import vitePreprocessor from "cypress-vite";

export default (on: (arg0: string, arg1: any) => void, config: any) => {
  on("file:preprocessor", vitePreprocessor(config));
  return config;
};
