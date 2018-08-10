const regression = require('regression');
const SMA = require('technicalindicators').SMA;

let arr = [3342, 3597, 2845, 2905, 2438, 2812, 3184, 3046, 5513, 9336, 2507, 2762, 2741, 3032, 4043, 2847, 3968, 3268, 4494, 3727, 4341, 4301, 4000, 3571,
    4047, 3935, 4664, 4624, 4366, 4597, 4945, 4264, 3680, 4105, 4181, 3982, 3715, 3390, 3714, 3629, 3054, 3170, 2969, 3185, 3014, 3230, 3540, 4194, 5359,
    8925, 14911, 26786, 6604, 3560, 3478, 3887, 3474, 3665, 3882,
    4166, 4507, 12909, 3278, 2243, 2871, 3195, 3343, 3539, 4297, 4797, 4142, 5026, 5581, 5270, 5273, 5778,
    5892, 5453, 5418, 4936, 6457, 4494, 5196, 5641, 4592, 5198, 4259, 4442, 3839, 3522, 3582, 4053, 4098,
    3809, 3516, 3764, 3937, 4054, 4170, 5033, 6031, 7128, 17142, 28031, 13891, 3758, 5064, 3522, 3826, 3162,
    4233, 2476, 3910, 10293, 3092, 3356, 3379, 3914, 4294, 5219, 3944, 4019, 4089, 4682, 5706, 6230, 5977,
    5826, 5755, 5436, 5322, 5006, 5952, 5408, 6039, 5679, 5551, 4869, 4629, 4458, 4507, 4265, 3680, 4338,
    4104, 4034, 3639, 3828, 4444, 4244, 3893, 4334, 6307, 9101, 13408, 23068, 17330, 3901, 4235, 3821, 3649,
    3899, 4478, 4094, 4079, 9278, 2794, 3203, 3423, 3807, 4544, 3141, 4653, 4641, 3827, 4198, 5661, 5706,
    6128, 5758, 6844, 5488, 5276, 4954, 4898, 4717, 4219, 4908, 4435, 4431, 5299, 4930, 3717, 3991, 3825,
    4115, 3563, 3337, 3185, 3240]
let arrin = []
let i = 0, week = 0, year = 2012
for (let el of arr) {
    week++
    i++
    if (week > 52) {
        week = 1
        year++
    }
    arrin.push([year, i, String(year) + String((String(week).length === 1) ? "0" + week : week), el])
}

console.log('arr in spread:')

console.log(...arrin)

console.log('regression is:')

console.log(SMA.calculate({ period: 200, values: arr }))
sma = SMA.calculate({ period: 200, values: arr })[0]
let arrSma = []
for (let i of arr) {
    arrSma.push([i, i / sma])
    //console.log(i/sma)
}

for (let i of arrSma) {
    console.log(i.toString())
}

function regressionValue(arrin, dev = true) {
    const result = regression.linear(arrin);
    // console.log(result)
    const gradient = result.equation[0];
    //console.log(gradient2)
    const yIntercept = result.equation[1];
    //console.log(yIntercept2)
    ob = {
        string: result.string,
        gradient,
        yIntercept
    }
    if (dev) console.log(ob)
    return ob
}

function yearFilter(value) {
    //res=false
    //if (year===arr[0]) res=true
    let year = 2012
    return year === value[0]
}

let arrFiltered = arrin.filter(yearFilter)
console.log(...arrFiltered.map(x => [x[1], x[3]])
)
//regressionValue(arrFiltered,true)
console.log(' for 2012 regression is:')
let arrAn = arrFiltered.map(x => [x[1], x[3]])
console.log(...arrAn)
let regr1 = regressionValue(arrAn)
let sma1 = SMA.calculate({ period: arrAn.length, values: arrAn.map(x => x[1]) })[0]
console.log({ sma1 })

console.log(...arrFiltered)
let arrSmaPush = arrFiltered.map(x => ([x[0], x[1], x[2], x[3], (x[3] / sma1), x[1] * regr1.gradient + regr1.yIntercept]))
console.log(...arrSmaPush)
console.log('fact/progn')
arrSmaPush = arrSmaPush.map(x => ([x[0], x[1], x[2], x[3], x[4], x[5], x[3] / x[5]]))
console.log(...arrSmaPush)
console.log('Progn:')
let arrPr = [], x = 0
for (let i of arrSmaPush) {
    x++
    arrPr.push([x,((x+52)*regr1.gradient+regr1.yIntercept)*i[6]])
}
console.log(...arrPr)

let setYear = new Set(arrin.map(x => x[0]))
console.log(...setYear)
