import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
    try {
        // get latest stable nextflow version from github releases
        const response = await fetch('https://api.github.com/repos/nextflow-io/nextflow/releases');
        if (!response.ok) {
            throw new Error('Failed to fetch latest version');
        }
        const versions = await response.json();
        const formattedVersions = versions.map((version: any) => ({
            version: version['tag_name'],
            isEdge: version['prerelease'],
            downloadUrl: version['assets'][0]['browser_download_url'],
            downloadUrlAll: version['assets'][1]['browser_download_url'],
            published_at: version['published_at'],
        }));
        return new Response(
            JSON.stringify({
                latest:{
                    stable: formattedVersions.find((version: any) => !version.isEdge),
                    edge: formattedVersions.find((version: any) => version.isEdge),
                    everything: formattedVersions[0],
                },
                versions: formattedVersions,
            })
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: error.message,
            }),
            { status: 500 },
        );
    }
};
