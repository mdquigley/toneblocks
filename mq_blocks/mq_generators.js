Blockly.JavaScript['mq_sequencer'] = function (block) {
    let note1 = Blockly.JavaScript.valueToCode(block, 'VALUE1', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    let note2 = Blockly.JavaScript.valueToCode(block, 'VALUE2', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    let note3 = Blockly.JavaScript.valueToCode(block, 'VALUE3', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    let note4 = Blockly.JavaScript.valueToCode(block, 'VALUE4', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';

    const synth1 = new Tone.Synth().toDestination();
    const seq = new Tone.Sequence((time, note) => {
        synth1.triggerAttackRelease(note, '8n', time);
    }, [note1, note2, note3, note4]).start(0);

    return;
};