
$action["makeworld"] = () => {
    $stack.w = 64;
    $stack.h = 64;
    $stack.a.length = 0;
    $stack.a.length = $stack.w * $stack.h;
    for(let i=0; i<$stack.a.length; ++i) {
        $stack.a[i] = [];
        $stack.a[i].push(stack_set(1, 1));
    }

    $pos.x = $stack.w/2 + 0.5;
    $pos.y = $stack.h/2 + 0.5;
};

$action["pushstack"] = () => {
    const stack = stack_value($pos.x, $pos.y);
    if(!stack) {
        return;
    }
    if(stack.length > 0) {
        let [id, count] = stack_get(stack[stack.length-1]);
        count += 1;
        stack[stack.length-1] = stack_set(id, count);
    } else {
        stack.push(stack_set(1,1));
    }
};

$action["popstack"] = () => {
    const stack = stack_value($pos.x, $pos.y);
    if(!stack) {
        return;
    }
    if(stack.length > 0) {
        let [id, count] = stack_get(stack[stack.length-1]);
        count -= 1;
        if(count > 0) { 
            stack[stack.length-1] = stack_set(id, count);
        } else {
            stack.pop();
        }
    }
};
