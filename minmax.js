function hasAIWon(state) {
  const aiStates = state.map(cell => {
    if (cell === aiPlayer) return 'w';
    return '-';
  });
  const equalStates = winingRegExp => winingRegExp.test(aiStates.join(''));
  return winingStates().some(equalStates);

}
function hasHumanWon(state) {
  const humanStates = state.map(cell => {
    if (cell === humanPlayer) return 'w';
    return '-';
  });
  const equalStates = winingRegExp => winingRegExp.test(humanStates.join(''));
  return winingStates().some(equalStates);
}
function isTie(actions) {
  return actions.length === 0;
}
function max_val(state) {
  const actions = emptyCells(state);
  if (hasHumanWon(state)) return -1;
  if (hasAIWon(state)) return 1;
  if (isTie(actions)) return 0;

  let value = Number.MIN_SAFE_INTEGER;
  for (let action of actions) {
    board.place(action, aiPlayer);
    const resultStateOfAction = board.state();
    value = Math.max(value, min_val(resultStateOfAction));
    board.pick(action);
  }
  return value;
}
function min_val(state) {
  const actions = emptyCells(state);
  if (hasHumanWon(state)) return -1;
  if (hasAIWon(state)) return 1;
  if (isTie(actions)) return 0;


  let value = Number.MAX_SAFE_INTEGER;
  for (let action of actions) {
    board.place(action, humanPlayer);
    const resultStateOfAction = board.state();
    value = Math.min(value, max_val(resultStateOfAction));
    board.pick(action);
  }
  return value;
}
function maxActionValue(actionValue) {
  let max = null;
  let maxVal = Number.MIN_SAFE_INTEGER;
  let maxKey = null;
  for (let [k, v] of Object.entries(actionValue)) {
    if (v > maxVal) {
      maxVal = v;
      maxKey = k;
    }
  }
  return maxKey;
}
function minmax() {
  const actions = emptyCells(board.state());// actions = cell indexes
  const actionValue = {};
  for (let action of actions) {
    board.place(action, aiPlayer);
    const resultStateOfAction = board.state();
    const value = min_val(resultStateOfAction);
    actionValue[action] = value;
    board.pick(action);
  }
  const bestMove = maxActionValue(actionValue);
  return bestMove;
}

function emptyCells(state) {
  const onlyTruthy = x =>
    x !== undefined && x !== null && !isNaN(x) && x !== '' && x !== false;
  return state.map((cell, i) => {
    if (cell !== aiPlayer && cell !== humanPlayer)
      return i;
  }).filter(onlyTruthy);
}
function winingStates() {
  const winingRegExp = [
    // row wining match
    /^[-w]{3}w{3}[-w]{3}$/,
    /^w{3}[-w]{6}$/,
    /^[-w]{6}w{3}$/,

    // col win match
    /^w{1}[-w]{2}w{1}[-w]{2}w{1}[-w]{2}$/,
    /^([-w]{1}w{1}[-w]{1}){3}$/,
    /^([-w]{2}w{1}){3}$/,

    // cross win match
    /^w{1}[-w]{3}w{1}[-w]{3}w{1}$/,
    /^[-w]{2}w{1}[-w]{1}w{1}[-w]{1}w{1}[-w]{2}$/
  ];
  return winingRegExp;
}