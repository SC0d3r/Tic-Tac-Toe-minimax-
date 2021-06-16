function turnCurrentStateInto(state, player) {
  return state.map(cell => {
    if (cell === player)
      return 'w'; // w => "player's states"
    return '-';// - => "don't care states"
  });
}

function isAWiningState(playerState) {
  const equalStates = winingRegExp => winingRegExp.test(playerState.join(''));
  return winingStates().some(equalStates);
}

function hasAIWon(state) {
  const aiStates = turnCurrentStateInto(state, aiPlayer);
  return isAWiningState(aiStates);
}
function hasHumanWon(state) {
  const humanStates = turnCurrentStateInto(state, humanPlayer);
  return isAWiningState(humanStates);
}
function isATie(actions) {
  return actions.length === 0;
}


function max_val(state) {
  const actions = emptyCells(state);
  if (hasHumanWon(state)) return -1;
  if (hasAIWon(state)) return 1;
  if (isATie(actions)) return 0;

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
  if (isATie(actions)) return 0;


  let value = Number.MAX_SAFE_INTEGER;
  for (let action of actions) {
    board.place(action, humanPlayer);
    const resultStateOfAction = board.state();
    value = Math.min(value, max_val(resultStateOfAction));
    board.pick(action);
  }
  return value;
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

function emptyCells(state) {
  const withoutUndefined = x => x !== undefined;
  return state.map((cell, i) => {
    if (cell === null) return i;
  }).filter(withoutUndefined);
}

function winingStates() {
  const winingRegExp = [
    // row wining matches
    /^[-w]{3}w{3}[-w]{3}$/,
    /^w{3}[-w]{6}$/,
    /^[-w]{6}w{3}$/,

    // col wining matches
    /^w{1}[-w]{2}w{1}[-w]{2}w{1}[-w]{2}$/,
    /^([-w]{1}w{1}[-w]{1}){3}$/,
    /^([-w]{2}w{1}){3}$/,

    // cross wining matches
    /^w{1}[-w]{3}w{1}[-w]{3}w{1}$/,
    /^[-w]{2}w{1}[-w]{1}w{1}[-w]{1}w{1}[-w]{2}$/
  ];
  return winingRegExp;
}