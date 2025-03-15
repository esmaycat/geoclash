(async () => {
    const canvas = document.getElementById('map');
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const ctx = canvas.getContext('2d');
    
    const observer = new ResizeObserver((entries) => {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
    });
    observer.observe(canvas)

    const hexdata = await fetch('hexdata/hexdata.json').then(response => response.json());

    let xMax = 0;
    let yMax = 0;
    for (const {x, y} of hexdata) {
        if (x > xMax) xMax = x;
        if (y > yMax) yMax = y;
    }

    const draw = (time) => {
        canvas.width = width;
        canvas.height = height;

        const xScale = width / xMax;
        const yScale = height / yMax;
        const scale = Math.min(xScale, yScale);

        ctx.fillStyle = "rgb(0, 0, 0)";
        hexdata.forEach(({x, y}) => {
            ctx.fillRect(x*scale, y*scale, scale, scale);
        });

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})()