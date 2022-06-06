
$action["makeworld"] = () => {
    const no = data_tile_index("tile");

    tile_init_empty(64, 64);
    for(let x=24; x<=40; ++x) {
        for(let y=24; y<=40; ++y) {
            tile_base_set(x, y, no);
        }
    }

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
