
$action["makeworld"] = () => {
    const b = data_tile_index("tile");
    const m = data_tile_index("mine");

    tile_init_empty(64, 64);
    for(let x=24; x<=40; ++x) {
        for(let y=24; y<=40; ++y) {
            tile_base_set(x, y, b);
        }
    }

    tile_prop_set(29, 29, m);
    tile_prop_set(35, 29, m);
    tile_prop_set(29, 35, m);
    tile_prop_set(35, 35, m);

    $pos.x = $tile.w/2 + 0.5;
    $pos.y = $tile.h/2 + 0.5;
};

$action["pushtile"] = () => {
    const tile = tile_base($pos.x, $pos.y);
    if(!tile) {
        return;
    }
    tile.count += 1;
};

$action["poptile"] = () => {
    const tile = tile_base($pos.x, $pos.y);
    if(!tile) {
        return;
    }
    if(tile.count <= 1) {
        return;
    }
    tile.count -= 1;
};

$action["text"] = (tex) => {
    const data = data_texture(data_texture_index(tex));
    if(!data) {
        return;
    }
    cvs_text(data.cvs, ""+$listen.timer.count);
    gl_updateGLTexture2D(data.tex, data.cvs);
};