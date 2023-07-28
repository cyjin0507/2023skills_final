// const regex = /\d{3}-\d{4}-\d{4}/

// const regex = /[a-zA-z가-힣]{5}@gmail.com/

// 1.1
// const regex = /^[가-힣]{2,6}$/
// console.log(regex.test('아아앙아아'))


// 1.2
// const regex = /^[0-9a-zA-Z]{2,8}$/
// console.log(regex.test('213sdf'));


// 2.1
// const regex = /\d{4}년\d{2}월\d{2}일/
// console.log(regex.test('2023년12월12일'));


// 3.1
const regex = /\d{3}-\d{4}-\d{4}/
console.log(regex.test('010-0000-0000'))