
$action["makeworld"] = () => {
    $tile.w = 64;
    $tile.h = 64;
    $tile.a.length = 0;
    $tile.a.length = $tile.w * $tile.h;
    for(let i=0; i<$tile.a.length; ++i) {
        $tile.a[i] = [];
        $tile.a[i].push(tile_set(1, 1));
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
        let [id, count] = tile_get(tile[tile.length-1]);
        count += 1;
        tile[tile.length-1] = tile_set(id, count);
    } else {
        tile.push(tile_set(1,1));
    }
};

$action["poptile"] = () => {
    const tile = tile_value($pos.x, $pos.y);
    if(!tile) {
        return;
    }
    if(tile.length > 0) {
        let [id, count] = tile_get(tile[tile.length-1]);
        count -= 1;
        if(count > 0) { 
            tile[tile.length-1] = tile_set(id, count);
        } else {
            tile.pop();
        }
    }
};
