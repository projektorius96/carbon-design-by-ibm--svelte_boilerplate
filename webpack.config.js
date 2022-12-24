const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/* const HtmlWebpackPlugin = require("html-webpack-plugin"); */ /* TIP : if you really want to use it -> npm i html-webpack-plugin -D */
const path = require("path");
const { ESBuildMinifyPlugin } = require("esbuild-loader");
const { optimizeImports } = require("carbon-preprocess-svelte");

const NODE_ENV = process.env.NODE_ENV || "development";
const PROD = NODE_ENV === "production";

module.exports = {
  entry: { "build/bundle": ["./src/index.js"] },
  resolve: {
    modules: [
      /* path.resolve(__dirname, 'src'),  */'node_modules'
    ],
    alias: { svelte: path.dirname(require.resolve("svelte/package.json")) },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    /* publicPath: "/", */
    /* path: path.join(__dirname, "/public"), */
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    /* filename: PROD ? "[name].[contenthash].js" : "[name].js", */
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        use: {
          loader: "svelte-loader",
          options: {
            preprocess: [optimizeImports()],
            hotReload: !PROD,
            compilerOptions: { dev: !PROD },
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: { fullySpecified: false },
      },
    ],
  },
  mode: NODE_ENV,
  plugins: [
    new MiniCssExtractPlugin({
      filename: PROD ? "[name].[chunkhash].css" : "[name].css",
    }),
    /* new HtmlWebpackPlugin({
      templateContent: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </head>
        <body></body>
      </html>
      `,
    }), */
  ],
  stats: "errors-only",
  devtool: PROD ? false : "source-map",
  /* devServer: { hot: true, historyApiFallback: true }, */ /* instead : */
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: process.env.PORT || 8282, /* default : 8080 */
    historyApiFallback: {
      index: true
    },
    devMiddleware: {
        writeToDisk: false, /* refer to for an explanation : 
            @ https://github.com/webpack/webpack-dev-middleware#writetodisk 
            @ https://dev.to/projektorius96/webpack-devserver-26g7
        */
    },
  },
  optimization: {
    minimizer: [new ESBuildMinifyPlugin({ target: "es2015" })],
  },
};