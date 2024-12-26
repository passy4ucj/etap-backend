//  const str = "gj12nwe6asba78nas1nljd9";

//  const strNumbers = str.match(/\d+/g);

//  console.log(strNumbers);

// const largestNumber = Math.max(...strNumbers.map(Number));
 
//  console.log('Max Number:', largestNumber);

// ----
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]

// const arg1 = [5,2,4,15];
// const arg2 = 15;

// const twoSum = function(nums, target) {
//     for (let i = 0; i < nums.length; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             if(nums[i] + nums[j] === target) {
//                 return [i, j]
//             }
//         } 
//     }
//     return [];

// };

// console.log('RESULT', twoSum(arg1, arg2));

// ----

// Input: x = 121
// Output: true

// const isPalindrome = (x) => {
//     if(x < 0) {
//         return false
//     }
//     const strNumber = x.toString();

//     const reversedString = strNumber.split('').reverse().join('');

//     return strNumber === reversedString;
    
// };

// console.log('RESULT', isPalindrome(121));


// --- Roman numerals
// const romanToInt = (s) => {
//     const romanMap = {
//         'I': 1,
//         'V': 5,
//         'X': 10,
//         'L': 50,
//         'C': 100,
//         'D': 500,
//         'M': 1000
//     };

//     let result = 0;

//     for (let i = 0; i < s.length; i++) {
//         const currentValue = romanMap[s[i]];
//         const nextValue = romanMap[s[i + 1]];
        
//         if(currentValue < nextValue) {
//             result -= currentValue
//         } else {
//             result += currentValue
//         }
//     }

//     return result;
// }

// console.log('RESULT', romanToInt('MCMXCIV'));

// -- Longst common prefix 
// const longestCommonPrefix = (strs) => {
//     if(strs.length === 0) return "";

//     const minLength = Math.min(...strs.map(str => str.length));

//     let prefix = "";
//     for (let i = 0; i < minLength; i++) {
//         let char = strs[0][i]
//         let isCommon = strs.map(str => str[i] === char).every(isMatch => isMatch)
//         if(isCommon) {
//             prefix += char;
//         } else {
//             break;
//         }
//     }

//     return prefix;
// }

// console.log('RESULT', longestCommonPrefix(["flower", "flow", "flight"]))


// 20. Valid Parentheses
// const isValid = (s) => {
//     const stack = [];
//     const matchingBrackets = {
//         ')': '(',
//         '}': '{',
//         ']': '['
//     }

//     for (let i = 0; i < s.length; i++) {
//         const element = s[i];
//         if(matchingBrackets[element]) {
//             const topElement = stack.length > 0 ? stack.pop() : '#'
//             if (topElement !== matchingBrackets[element]) {
//                 return false
//             }
//         } else {
//             stack.push(element)
//         }
//     }

//     return stack.length === 0;
// }

// console.log('RESULT', isValid("()"))

// Merge Two Sorted Lists
function ListNode(val = 0, next = null) {
    this.val = val;
    this.next = next;
}

const mergeTwoLists = (list1, list2) => {
    if(list1 === null) return list2;
    if(list2 === null) return list1;

    if(list1.val <= list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next)
        return list2
    }
}

const list1 = new ListNode(1, new ListNode(2, new ListNode(4)))
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)))
const mergedList = mergeTwoLists(list1, list2)

console.log('RESULT', mergedList);
