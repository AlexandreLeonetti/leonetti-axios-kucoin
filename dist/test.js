/* calculate the join point of two sequences */
/*

We consider the sequence of numbers in which a number is followed by the same number plus the sum of these digits.
For example 34 is followed by 41 (41 = 34 + (3+4)).

41 is itself followed by 46 (46 = 41 + (4+1)).

Two sequences with different starting points can end up joining.
For example, the sequence that starts at 471 and the sequence that starts at 480 share the number 519 (the join point).
Obviously after the join point, the sequences are identical.

*/
function addDigits(x) {
    let sum = 0;
    while (x > 0) {
        sum += x % 10;
        x = Math.floor(x / 10);
    }
    return sum;
}
export function joinPoint(a, b) {
    /* addDigits(a) many times and put results in an array.
    addDigits(b) and search in above array. stop when found. */
    let arrSums = [];
    /* consider starting with smaller number to improve algorithm searching speed */
    function recursion(num, second) {
        let sumNum = addDigits(num);
        let sumSecond = addDigits(second);
        arrSums.push(sumNum);
        if (arrSums.includes(sumSecond)) {
            return sumSecond;
        }
        else {
            return recursion(sumNum, sumSecond);
        }
    }
    let res = recursion(a, b);
    console.log(res);
    return res;
}
let res = joinPoint(472, 480);
console.log(res);
