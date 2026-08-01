import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 env : {
 url_base: "https://newhopoe.vercel.app"
 } ,
 images: {
    domains: ["cdn.dummyjson.com"],
  },
};

export default nextConfig;
