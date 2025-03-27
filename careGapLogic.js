// given a g[i]p[j] matrix where g is group and p i population, derived
// from a MeasureReport.group[i].population[j] object, this function will return
// 'null', 'Tobacco history' or 'Tobacco Intervention'
let mr=MeasureReport
if mr.group[0].population[0].count = 0  OR mr.group[0].population[2].count = 0 return 'null'
if mr.group[2].population[3].count = 1 return 'No gap'
if mr.group[0].population[3].count = 0 return 'Tobacco history'
if mr.group[0].population[3].count = 1 return 'Tobacco intervention'
