
$action["makeworld"] = () => {
    const b = data_tile_index("tile");
    const m = data_tile_index("mine");

    // tile
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

    // pos
    pos_init($tile.w/2 + 0.5, $tile.h/2 + 0.5);

    // item
    item_init_empty(8);
    item_gain(data_item_index("pick"), 1);
};

$action["text"] = (tex) => {
    const data = data_texture(data_texture_index(tex));
    if(!data) {
        return;
    }
    cvs_text(data.cvs, ""+$timer.n);
    gl_updateGLTexture2D(data.tex, data.cvs);
};