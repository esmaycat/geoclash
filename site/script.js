const biomeColours = {
    'desert': '#b9a087',
    'taiga': '#72b38e',
    'forest': '#33a02c',
    'grassland': '#d9b400'
};

(async () => {
    const canvas = document.getElementById('map');
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const ctx = canvas.getContext('2d');
    
    const observer = new ResizeObserver((entries) => {
        width = canvas.clientWidth;
        height = canvas.clientHeight;

        draw();
    });
    observer.observe(canvas)

    const hexdata = await fetch('hexdata/hexdata.json').then(response => response.json());

    let xMax = 0;
    let yMax = 0;
    for (const {x, y} of hexdata) {
        if (x > xMax) xMax = x;
        if (y > yMax) yMax = y;
    }

    const draw = () => {
        canvas.width = width;
        canvas.height = height;

        const xScale = width / xMax;
        const yScale = height / yMax;
        const scale = Math.min(xScale, yScale);

        ctx.strokeStyle = "rgb(100, 100, 100)";
        hexdata.forEach(({x, y, biome}) => {
            ctx.fillStyle = biomeColours[biome];

            ctx.beginPath();
            ctx.moveTo(x*scale, y*scale);
            ctx.lineTo((x + 1.82)*scale, (y - 1.05)*scale);
            ctx.lineTo((x + 3.64)*scale, y*scale);
            ctx.lineTo((x + 3.64)*scale, (y + 2.1)*scale);
            ctx.lineTo((x + 1.82)*scale, (y + 3.15)*scale);
            ctx.lineTo(x*scale, (y + 2.1)*scale);
            ctx.lineTo(x*scale, y*scale);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        });

        // requestAnimationFrame(draw);
        // Quite laggy, might re-enable when tooltips are added?
    }

    draw();
    // requestAnimationFrame(draw);
})()