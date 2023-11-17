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
    let subtitle = args.subtitle || '';
    subtitle = subtitle.indexOf('. ') > -1 ? subtitle.substring(0, subtitle.indexOf('. ')) : subtitle;
    const text = args.title.length > 25 && subtitle ? args.title : args.title + ' - ' + subtitle;
    const category = args.category || 'nf-core';
    const html_string = `
    <div class="container"
        style="height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        font-size: 32px;
        font-weight: 600;
        color: #F8F9FA;
        background-color: #212529;
        border-top: 5pt solid #1a9655;
        background-image: url('https://raw.githubusercontent.com/nf-core/website/new-og-img/public/images/og-img-bg.svg');
        ">

        <div style="display:flex; flex-direction:column; width:75%; height:100%;">

        <div style="display:flex;
        width: 75%;
        align-items:start;
        justify-content:center;
        padding-left 1rem;
        padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;">
            <h1 style="color: #F8F9FA;">${text}</h1>
        </div>
        <span style="font-size: 28px; border-bottom-left-radius: 6px;
            border-bottom-left-radius 6px
            border-bottom-right-radius 6px;
            border-top-left-radius 6px;
            border-top-right-radius 6px;
            padding; 1rem;
            background: '#2c2c2c';
            border: 2pt solid '#222529'">
            ${category}
        </span>
    </div>
    <style>
    h1 {
        font-size: 64px;
        font-weight: 500;
    }
    </style>`;

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
    const svg = await satori(jsx, {
        debug: debug,
        width: width,
        height: height,
        fonts: [
            {
                name: 'Roboto',
                data: mavenpro,
                weight: 700,
                style: 'normal',
            },
        ],
    });

    return await sharp(Buffer.from(svg)).png().toBuffer();
}

export const prerender = false;
