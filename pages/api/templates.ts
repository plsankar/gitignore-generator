// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RepoFile, SelectOption } from "@/components/types";
import type { NextApiRequest, NextApiResponse } from "next";

export type TemplatesEndpointResponse = {
    success: boolean;
    message: string;
    templates: SelectOption[];
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<TemplatesEndpointResponse>
) {
    fetch("https://api.github.com/repos/github/gitignore/contents/", {
        method: "GET",
        headers: {
            "User-Agent": "https://github.com/plsankar",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    })
        .then((response) => response.json())
        .then((data: RepoFile[]) => {
            // console.log(data);
            const templates = data
                .filter((file) => file.type === "file")
                .map((file) => file.name.replaceAll(".gitignore", ""))
                .map((template) => {
                    return { value: template, label: template };
                });

            res.status(200).json({
                success: true,
                message: "",
                templates: templates,
            });
        })
        .catch((error) => {
            console.log("error", error);
            res.status(200).json({
                success: false,
                message: "Server Error",
                templates: [],
            });
        });
}
