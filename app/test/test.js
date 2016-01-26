/**
 * Created by Blazers on 2016/1/26.
 *
 * 不通过browserify聚合 不能有依赖项
 *
 */
let a = [1,2,3,4,5];
let b = a.map(item => item*2);
alert(b);