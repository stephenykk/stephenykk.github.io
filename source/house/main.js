document.title = "房贷计算器";
/* 
根据还款年限，计算月供金额
*/
function getMonthlyPayment(loanAmount, interestRate, loanTerm) {
    const monthlyRate = interestRate / 12;
    const totalPayments = loanTerm * 12;
    return (
        (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -totalPayments))
    );
}

function toFixed(num, decimal = 0) {
    return num.toFixed(decimal) * 1;
}

function mapValues(obj, keys, fn) {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key] = keys.includes(key) ? fn(obj[key], key, obj) : obj[key];
        return acc;
    }, {});
}

// 添加日期字段
const getDate = (date, isDash = false) => {
    const d = new Date(date);
    return isDash
        ? `${d.getFullYear()}-${fillZero(d.getMonth() + 1)}`
        : `${d.getFullYear()}年${fillZero(d.getMonth() + 1)}月`;
};

// 中文时间转为数字时间
const cnTimeToDashTime = (date) => {
    return date.replace(/\D/g, "-").replace(/-\D*$/, "");
};
function fillZero(num) {
    return num < 10 ? "0" + num : num;
}
const getLast = (list) => {
    return list[list.length - 1];
};
const getYearMonth = (dateStr) => {
    const date = new Date(dateStr);
    return date.getFullYear() + "-" + fillZero(date.getMonth() + 1);
};

const getSum = (list, key) => {
    return toFixed(list.reduce((acc, item) => acc + item[key], 0))
};

function getCurTime() {
    const today = new Date();
    today.setDate(1);
    const curTime = today.toISOString().split("T")[0];
    return curTime;
}

/**
 * 根据借款基础信息，计算月供等数据
 */
function getMonthlyDetail({
    firstPayMoney, // 首付
    loanMoney,
    loanRate,
    loanYears,
    startTime,
    curTime,
    aheadPayTime,
    aheadPayMoney,
}) {
    const monthlyRate = loanRate / 12;
    const totalMonths = loanYears * 12;

    let monthlyData = [];
    let remainBenjin = loanMoney;
    let monthlyPay = 15000;

    const getMonthlyInfo = () => {
        while (remainBenjin > 0) {
            // debugger;
            const monthlyInterest = remainBenjin * monthlyRate;
            const monthlyBenjin = monthlyPay - monthlyInterest;
            remainBenjin -= monthlyBenjin;
            monthlyData.push({
                sn: monthlyData.length + 1,
                remainBenjin,
                monthlyBenjin,
                monthlyInterest,
                monthlyPay,
            });
        }
    };

    const smallLs = [];
    const bigLs = [];
    while (monthlyData.length != totalMonths) {
        const actualTotalMonths = monthlyData.length;
        const isSmall = actualTotalMonths > totalMonths;
        const ls = isSmall ? smallLs : bigLs;
        ls.push(monthlyPay);
        let delta = 1;
        if (isSmall) {
            const lastBig = bigLs[bigLs.length - 1];
            delta = lastBig ? (lastBig - monthlyPay) * 0.5 : monthlyPay * 0.5;
        } else {
            const lastSmall = smallLs[smallLs.length - 1];
            delta = lastSmall
                ? (lastSmall - monthlyPay) * 0.5
                : (0 - monthlyPay) * 0.5;
        }
        // const delta = actualTotalMonths > totalMonths ? 1 : -1;
        monthlyData = [];
        remainBenjin = loanMoney;
        monthlyPay = monthlyPay + delta;
        const minMonthlyPay = remainBenjin * monthlyRate;
        if (monthlyPay < minMonthlyPay) {
            monthlyPay = minMonthlyPay + 100;
        }
        console.log("🚀 ~ getMonthlyDetail ~ monthlyPay:", monthlyPay);
        console.time("mm");
        getMonthlyInfo();
        console.timeEnd("mm");
    }

    let yearStartIndex = 0
    monthlyData.forEach((item, index) => {
        const itemDate = new Date(startTime);
        itemDate.setMonth(itemDate.getMonth() + index);
        
        const nextItemDate = new Date(startTime);
        nextItemDate.setMonth(nextItemDate.getMonth() + index + 1);
        if (itemDate.getFullYear() !== nextItemDate.getFullYear()) {
            yearEndIndex = index;
            const yearData = monthlyData.slice(yearStartIndex, yearEndIndex + 1);
            const yearInterest = getSum(yearData, "monthlyInterest");
            item.yearInterest = yearInterest;
            yearStartIndex = index + 1;
        }

        const date = getDate(itemDate);
        const curDate = new Date(curTime);
        const aheadDate = new Date(aheadPayTime);
        if (curDate > itemDate) {
            item.isBefore = true;
        } else {
            if (getYearMonth(curDate) === getYearMonth(itemDate)) {
                item.isCur = true;
            }
            if (getYearMonth(aheadDate) === getYearMonth(itemDate)) {
                item.isAhead = true;
            }
            item.isAfter = true;
        }
        item.date = date;
    });

    const addMonth = (date, n) => {
        const d = new Date(date);
        d.setMonth(d.getMonth() + n);
        return d;
    };

    // 如有提前还款，则重新计算后续还款的明细
    let aheadMonthlyData = [];
    if (aheadPayMoney) {
        aheadMonthlyData = monthlyData.slice();
        const aheadIndex = aheadMonthlyData.findIndex((item) => {
            aheadDate = getDate(aheadPayTime);
            return item.date === aheadDate
        });
        aheadMonthlyData.splice(aheadIndex);
        let remainBenjin =
            aheadMonthlyData[aheadMonthlyData.length - 1].remainBenjin -
            aheadPayMoney;
        let i = 0;
        while (remainBenjin > 0) {
            const monthlyInterest = remainBenjin * monthlyRate;
            const monthlyBenjin = monthlyPay - monthlyInterest;
            remainBenjin -= monthlyBenjin;
            aheadMonthlyData.push({
                sn: aheadIndex + i + 1,
                isAfter: true,
                date: getDate(addMonth(aheadPayTime, i)),
                monthlyBenjin,
                monthlyInterest,
                remainBenjin,
                monthlyPay,
            });
            i = i + 1;
        }
    }

    // add yearInterest
    if (aheadMonthlyData.length > 0) {
        let aheadYearStartIdx = 0;
        const yearSaveInterestList = [];
        aheadMonthlyData.forEach((item, index) => {
            const time = cnTimeToDashTime(item.date)
            const itemDate = new Date(time);
            const month = itemDate.getMonth() + 1;
            if (month === 12) {
                const aheadYearEndIdx = index;
                const yearData = aheadMonthlyData.slice(aheadYearStartIdx, aheadYearEndIdx + 1);
                const yearInterest = getSum(yearData, "monthlyInterest");
                item.yearInterest = yearInterest;
                const yearSaveInterest = toFixed(monthlyData[index].yearInterest - yearInterest || 0);
                item.yearSaveInterest = yearSaveInterest;
                yearSaveInterestList.push(yearSaveInterest);
                item.totalSaveInterest = toFixed(yearSaveInterestList.reduce((a, b) => a + b, 0));
                aheadYearStartIdx = index + 1;
            }

        })
    }

    const beforeData = monthlyData.filter((item) => item.isBefore);
    const afterData = monthlyData.filter((item) => item.isAfter);

    const hasPayLixi = getSum(beforeData, "monthlyInterest");
    const hasPayBenjin = getSum(beforeData, "monthlyBenjin");
    const hasPayAmount = hasPayBenjin + hasPayLixi;

    const remainPayBenjin = getSum(afterData, "monthlyBenjin");
    const remainPayLixi = getSum(afterData, "monthlyInterest");
    const remainPayAmount = toFixed(remainPayBenjin + remainPayLixi);

    const sumPayAmount = toFixed(hasPayAmount + remainPayAmount)
    const sumPayLixi = toFixed(hasPayLixi + remainPayLixi);
    const totalCost = toFixed(sumPayAmount + firstPayMoney);


    const endTime = cnTimeToDashTime(getLast(monthlyData).date); // 贷款结束时间
    const aheadEndTime = !aheadMonthlyData.length
        ? endTime
        : cnTimeToDashTime(getLast(aheadMonthlyData).date); // 提前还贷款结束时间

    const aheadSumPayAmount = !aheadMonthlyData.length ? sumPayAmount : getSum(aheadMonthlyData, "monthlyPay") + aheadPayMoney * 1;
    const aheadSumPayLixi = !aheadMonthlyData.length ? sumPayLixi : getSum(aheadMonthlyData, "monthlyInterest");
    const aheadTotalCost = !aheadMonthlyData.length ? totalCost : toFixed(aheadSumPayAmount + firstPayMoney);

    const monthPayMoney = toFixed(monthlyPay);
    monthlyData = monthlyData.map((item) =>
        mapValues(
            item,
            ["monthlyInterest", "monthlyPay", "remainBenjin", "monthlyBenjin", "yearInterest"],
            (value) => toFixed(value)
        )
    );
    aheadMonthlyData = aheadMonthlyData.map((item) =>
        mapValues(
            item,
            ["monthlyInterest", "monthlyPay", "remainBenjin", "monthlyBenjin", "yearInterest"],
            (value) => toFixed(value)
        )
    );

    console.table(monthlyData);
    console.table(aheadMonthlyData);

    return {
        monthlyData,
        aheadMonthlyData,
        monthPayMoney,
        endTime,
        aheadEndTime,
        hasPayLixi,
        hasPayAmount,
        hasPayBenjin,
        remainPayAmount,
        remainPayBenjin,
        remainPayLixi,
        sumPayAmount,
        sumPayLixi,
        aheadSumPayAmount,
        aheadSumPayLixi,
        totalCost,
        aheadTotalCost,
    };
}

window.myapp = new Vue({
    el: "#houseApp",
    delimiters: ["${", "}"],
    data(){
        
        const bhInfo = {
            nowHouseAmount: 350000,
            firstPayRate: 0.2,
            firstPayMoney: 128000,
            loanRate: 0.04,
            loanYears: 30,
            aheadPayMoney: 0,
            aheadPayTime: getCurTime(),
            startTime: "2016-03-01",
        };
        const njInfo = {
            nowHouseAmount: 1350000,
            firstPayRate: 0.3,
            firstPayMoney: 471000,
            loanRate: 0.048,
            loanYears: 30,
            aheadPayMoney: 0,
            aheadPayTime: getCurTime(),
            startTime: "2023-04-01",
        };
        
        return location.pathname.endsWith("bh.html")
            ? {baseInfo: bhInfo}
            : {baseInfo: njInfo};
    },
    computed: {
        house() {
            return this.getData(this.baseInfo);
        },
        hasAheadPay() {
            return this.house.aheadMonthlyData.length > 0;
        },
        lastTotalSaveInterest() {
            if (!this.hasAheadPay) {
                return 0;
            }
            const lastYearItem = this.house.aheadMonthlyData.filter(it => it.totalSaveInterest).pop();
            return lastYearItem?.totalSaveInterest || 0;
        },
        extraYearSaves() {
            if (!this.hasAheadPay) {
                return {}
            }
            const {aheadMonthlyData, monthlyData} = this.house
            const extraYearLs = []
            monthlyData.forEach((it, index) => {
                if (index < aheadMonthlyData.length) return false
                if (it.yearInterest) {
                    extraYearLs.push([index, it.yearInterest])
                }
            })
            const extraYearSumLs = extraYearLs.map(([index, yearInterest], j) => {
                const sumInterest = extraYearLs.slice(0, j + 1).reduce((sum, [index, yearInterest]) => sum + yearInterest, 0)
                return [index, sumInterest]
            })
            const extraYearSumMap = Object.fromEntries(extraYearSumLs)
            return extraYearSumMap
        }
    },
    methods: {
        goTop() {
            window.scrollTo({top: 0, behavior: "smooth"});

        },
        getData: ({
            firstPayRate,
            firstPayMoney,
            loanRate,
            loanYears,
            aheadPayMoney,
            startTime,
            aheadPayTime,
        }) => {
            const houseAmount = toFixed(firstPayMoney / firstPayRate)
            const loanMoney = toFixed(houseAmount - firstPayMoney)
            const curTime = getCurTime()
            if (!aheadPayTime) {
                aheadPayTime = curTime; // 如果没有提前还款时间，则默认为当前时间
            }
            const detail = getMonthlyDetail({
                firstPayMoney,
                loanMoney,
                loanRate,
                loanYears,
                startTime,
                curTime,
                aheadPayTime,
                aheadPayMoney,
            });

            return {
                firstPayRate,
                firstPayMoney,
                loanRate,
                loanYears,
                aheadPayMoney,
                startTime,
                houseAmount,
                loanMoney,
                curTime,
                aheadPayTime,
                ...detail
            };
        },
        changeCurrentUser() {
            LCache.set("curUser", this.currentUser);
            showToast(`修改成功，当前用户是 ${this.currentUser || "默认用户"}`);
        },
    },
});


console.log('myapp data::', window.myapp.$data)
