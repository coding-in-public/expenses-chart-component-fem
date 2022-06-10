const chartEl = document.querySelector('#chart');

const formatMoneyToDollars = (amt) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD" }).format(
    amt
  );

const isCurrentDay = (dayName = 'Friday') => {
  const today = new Date().getDay();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[today] === dayName;
}

function generateFakeItem(item){
  const data = {
    dayName: item.day,
    dayAbbr: item.day.substring(0, 3).toLowerCase(),
    dayAmt: item.amount,
    // barHeight: generateChartHeight(item.amount),
  };
  return `
  <div class="relative flex-1 grid">
    <button class="peer grid gap-3">
      <div class="bg-neutral2 animate-pulse rounded-sm h-0" style="height: ${data.dayAmt * 1.5}px;"></div>
      <p class="text-xs text-neutral2">${data.dayAbbr}</p>
    </button>
    <p class="bg-neutral1 text-neutral4 text-xs p-1 rounded-sm absolute -top-8 left-1/2 -translate-x-1/2 transition-opacity duration-300 opacity-0 peer-focus:opacity-100 peer-hover:opacity-100" aria-hidden="true">${formatMoneyToDollars(
      data.dayAmt
    )}</p>
  </div>
`;
}

function generateChartItem(item){
  const data = {
    dayName: item.day,
    dayAbbr: item.day.substring(0, 3).toLowerCase(),
    dayAmt: item.amount,
    currentDay: isCurrentDay(item.day),
  };
  return `
  <div class="relative flex-1 grid">
    <button class="peer grid gap-3 focus:outline-none focus-visible:ring-4 ${
      data.currentDay === true ? "ring-accent1" : "ring-accent2"
    } rounded-sm" aria-label="${
    data.dayName
  }’s spending was ${formatMoneyToDollars(data.dayAmt)}">
      <div class="${
        data.currentDay === true ? "bg-accent2" : "bg-accent1"
      } rounded-sm h-0" style="height: ${data.dayAmt * 3}px;"></div>
      <p class="text-xs text-neutral2">${data.dayAbbr}</p>
    </button>
    <p class="bg-neutral1 text-neutral4 text-xs p-1 rounded-sm absolute -top-8 left-1/2 -translate-x-1/2 transition-opacity duration-300 opacity-0 peer-focus:opacity-100 peer-hover:opacity-100" aria-hidden="true">${formatMoneyToDollars(
      data.dayAmt
    )}</p>
  </div>
`;
}

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

const getRanNumBetween = (min=10, max=60) => Math.floor(Math.random() * (max - min + 1) + min);

async function fetchChartData(){
  const chartFetch = await fetch('./data.json');
  const chartData = await chartFetch.json();
  const array = chartData.map((i) => parseInt(i.amount));
  const chartHeight = Math.max(...array) + Math.max(...array);
  const fakeData = [
    {
      day: "Monday",
      amount: getRanNumBetween(0, chartHeight),
    },
    {
      day: "Tuesday",
      amount: getRanNumBetween(0, chartHeight),
    },
    {
      day: "Wednesday",
      amount: getRanNumBetween(0, chartHeight),
    },
    {
      day: "Thursday",
      amount: getRanNumBetween(0, chartHeight),
    },
    {
      day: "Friday",
      amount: getRanNumBetween(0, chartHeight),
    },
    {
      day: "Saturday",
      amount: getRanNumBetween(0, chartHeight),
    },
    {
      day: "Sunday",
      amount: getRanNumBetween(0, chartHeight),
    },
  ];
  chartEl.innerHTML = fakeData.map((i) => generateFakeItem(i)).join("");
  await wait(1000);
  chartEl.innerHTML = chartData.map(i => generateChartItem(i)).join('');
}
fetchChartData()