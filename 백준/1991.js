const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let N = input.shift() * 1;
input = input.reduce((res, data) => {
    let [node, left, right] = data.split(' ');
    res[node] = { left, right };
    return res;
}, {});

let resultPreorder = "";
let resultInorder = "";
let resultPostorder = "";

function preorder(node, { left, right }) {
    resultPreorder += node;
    if (left !== ".") preorder(left, input[left]);
    if (right !== ".") preorder(right, input[right]);
}

function inorder(node, { left, right }) {
    if (left !== ".") inorder(left, input[left]);
    resultInorder += node;
    if (right !== ".") inorder(right, input[right]);
}

function postorder(node, { left, right }) {
    if (left !== ".") postorder(left, input[left]);
    if (right !== ".") postorder(right, input[right]);
    resultPostorder += node;

}

preorder("A", input["A"]);
inorder("A", input["A"]);
postorder("A", input["A"]);

console.log(resultPreorder);
console.log(resultInorder);
console.log(resultPostorder);
