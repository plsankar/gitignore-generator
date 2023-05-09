// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type GitignoreEndpointResponse = {
    success: boolean;
    message: string;
    gitignore?: string[];
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<GitignoreEndpointResponse>
) {
    const { templates } = req.query;
    if (!templates) {
        res.status(400).json({
            success: false,
            message: "Templates query parameter is required!",
        });
        return;
    }
    const templatesList = templates
        .toString()
        .split(",")
        .map((template) => template.trim());

    Promise.all(templatesList.map((template) => fetchTemplate(template)))
        .then((templateContents) => {
            res.status(200).json({
                success: true,
                message: "",
                gitignore: templateContents,
            });
        })
        .catch((error) => {
            console.log("error", error);
            res.status(200).json({
                success: false,
                message: "Server Error",
                gitignore: [],
            });
        });
}

function fetchTemplate(templateName: string): Promise<string> {
    return fetch(
        `https://cdn.jsdelivr.net/gh/github/gitignore@main/${templateName}.gitignore`,
        {
            method: "GET",
        }
    ).then((response) => response.text());
}
