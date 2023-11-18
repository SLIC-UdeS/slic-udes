// @ts-ignore: no types
import { html } from 'satori-html';
import satori, { init as initSatori } from 'satori/wasm';
import sharp from 'sharp';
// @ts-ignore: no types
import initYoga from 'yoga-wasm-web/asm';

const YOGA = initYoga();
initSatori(YOGA);

console.log('rendering og image');
export const get: APIRoute = async ({ params, request }) => {
    const searchParams = new URL(request.url).searchParams;
    const args = Object.fromEntries(searchParams);
    const html_string = `
    <div class="container"
        style="
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        font-size: 32px;
        font-family: 'inter';
        color: #F8F9FA;
        background-color: #212528;
        background-image: url('https://raw.githubusercontent.com/nf-core/website/new-og-img/public/images/og-img-bg.png');">
            <div style="display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-around;
            padding-right: 26rem;
            padding-left: 2rem;
            padding-top: 9rem;
            padding-bottom: 0.5rem;">
                <div style="display: flex;flex-direction: column;">
                    <h1 style="margin-bottom: 1rem;
                        font-size: 64px;
                        font-weight: 700;"
                        font-family: 'mavenpro';">
                        ${args.title}
                    </h1>
                    <div style="font-weight: 400;">${args.subtitle? args.subtitle: ''}</div>
                </div>
                <div
                    style="font-size: 28px;
                        border-bottom-left-radius: 6px;
                        border-bottom-right-radius: 6px;
                        border-top-left-radius: 6px;
                        border-top-right-radius: 6px;
                        font-weight: 400;
                        padding: 1rem;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                        background: #2c2c2c;
                        border: 3pt solid #757575;">
                    ${args.category ? args.category : 'nf-co.re'}
                </div>
            </div>
    </div>`;

    const imageOptions = { site: request.url, width: 1200, height: 630, debug: false };
    const jsx = html(html_string);
    const buffer = await generateImage(jsx, imageOptions);

    return new Response(buffer, {
        status: 200,
        headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'max-age=31536000, immutable',
        },
    });
};

type ImageOptions = {
    site: string;
    width: number;
    height: number;
    debug?: boolean;
};

async function generateImage(jsx: any, { width, height, debug }: ImageOptions) {
    const mavenpro = await fetch(
        'https://fonts.gstatic.com/s/mavenpro/v32/7Auup_AqnyWWAxW2Wk3swUz56MS91Eww8cLx1nejpBh8CvRBOA.woff',
    ).then((res) => res.arrayBuffer());
    const inter = await fetch(
        `https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff`,
    ).then((res) => res.arrayBuffer());
    const svg = await satori(jsx, {
        debug: debug,
        width: width,
        height: height,
        fonts: [
            {
                name: 'mavenpro',
                data: mavenpro,
                weight: 700,
                style: 'normal',
            },
            {
                name: 'inter',
                data: inter,
                weight: 400,
                style: 'normal',
            }

        ],
    });

    return await sharp(Buffer.from(svg)).png().toBuffer();
}

export const prerender = false;
