
define_action("newplayer", (self) => {
    // pos
    pos_init($grid.w/2 + 0.5, $grid.h/2 + 0.5);
    // item
    item_init_empty(8);
    item_gain(data_item_index("pick"), 1);
    item_gain(data_item_index("shovel"), 1);
});

define_action("inventory_next", (self) => {
    item_set_cursor(1);
});
define_action("inventory_prev", (self) => {
    item_set_cursor(-1);
});

define_action("inventory", (self) => {
    let text = "";
    for(let i=0; i<$item.s.length; ++i) {
        if($item.i === i) {
            text += ">";
        } else {
            text += " ";
        }
        text += "[" + i + "]";
        if($item.s[i] != null) {
            const item = data_item($item.s[i].no);
            if(!item) {
                continue;
            }
            text += item.text + ":" + $item.s[i].num;
        }
        text += "\n";
    }
    text += "\n";
    {
        const slot = item_select();
        if(slot != null) {
            const item = data_item(slot.no);
            if(item != null) {
                text += item.desc + "\n";
            }
        }
    }
    cvs_text(self.cvs, text);
    gl_updateGLTexture2D(self.img, self.cvs);
});

define_action("hand", (self) => {
    const item = item_select();
    if(!item) {
        return;
    }
    const data = data_item(item.no);
    if(!data) {
        return;
    }
    if(data.hand) {
        const ranges = hit_ranges($pos.x, $pos.y, $pos.ha);
        hit(data.hand.hit, 0, ranges);
    }
    if(data.base) {
        const ranges = hit_ranges($pos.x, $pos.y, $pos.ha);
        const result = hit(HIT_PUT, data.base.base, ranges);
        if(result > 0) {
            item_lose(item.no, result);
        }
    }
});

define_action("off-hand", (self) => {
});

define_action("activate", (self) => {
    const ranges = hit_ranges($pos.x, $pos.y, $pos.ha);
    hit(HIT_ACTIVATE, 0, ranges);
});

define_action("activate-target", (self) => {
    let text = "";
    const ranges = hit_ranges($pos.x, $pos.y, $pos.ha);
    for(const r of ranges) {
        const tile = grid_tile(r.x, r.y);
        if(!tile) {
            continue;
        }
        const data = data_tile(tile.no);
        if(!data) {
            continue;
        }
        text += data.desc;
        text += "\n";
    }
    cvs_text(self.cvs, text);
    gl_updateGLTexture2D(self.img, self.cvs);
});
