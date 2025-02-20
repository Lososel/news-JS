import path from "path";
import { merge } from "webpack-merge";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import DotenvWebpackPlugin from "dotenv-webpack";
import webpack from "webpack";

import "webpack-dev-server";

const baseConfig: webpack.Configuration = {
    entry: path.resolve(__dirname, "./src/index.ts"), // change to .ts
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts$/, // add TypeScript loader
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"], // support TypeScript files
    },
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "./dist"),
    },
    plugins: [
        new DotenvWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
            filename: "index.html",
        }),
        new CleanWebpackPlugin(),
    ],
};

export default ({ mode }: { mode: string }) => {
    const isProductionMode = mode === "prod";
    const envConfig = isProductionMode ? require("./webpack.prod.config") : require("./webpack.dev.config");

    return merge(baseConfig, envConfig);
};
