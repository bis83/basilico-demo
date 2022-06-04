
$action["makeworld"] = () => {
    const no = data_tile_index("tile");

    $tile.w = 64;
    $tile.h = 64;
    $tile.a.length = 0;
    $tile.a.length = $tile.w * $tile.h;
    for(let i=0; i<$tile.a.length; ++i) {
        $tile.a[i] = [];
        $tile.a[i].push({no: no, count:1});
    }
    $pos.x = $tile.w/2 + 0.5;
    $pos.y = $tile.h/2 + 0.5;
};

$action["pushtile"] = () => {
    const tile = tile_value($pos.x, $pos.y);
    if(!tile) {
        return;
    }
    if(tile.length > 0) {
        const obj = tile[tile.length-1];
        obj.count += 1;
    } else {
        const no = data_tile_index("tile");
        tile.push({no: no, count:1});
    }
};

$action["poptile"] = () => {
    const tile = tile_value($pos.x, $pos.y);
    if(!tile) {
        return;
    }
    if(tile.length > 0) {
        const obj = tile[tile.length-1];
        obj.count -= 1;
        if(obj.count <= 0) {
            tile.pop();
        }
    }
};
