
$action["pushstack"] = () => {
    const stack = stack_value($pos.x, $pos.y);
    if(stack && stack.length > 0) {
        let [id, count] = stack_get(stack[stack.length-1]);
        count += 1;
        stack[stack.length-1] = stack_set(id, count);
    }
};

$action["popstack"] = () => {
    const stack = stack_value($pos.x, $pos.y);
    if(stack && stack.length > 0) {
        let [id, count] = stack_get(stack[stack.length-1]);
        count -= 1;
        if(count > 0) { 
            stack[stack.length-1] = stack_set(id, count);
        } else {
            stack.pop();
        }
    }
};
