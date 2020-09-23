Blockly.Blocks['mq_chord'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("play chord")
            .appendField(new Blockly.FieldDropdown([["C", "c"], ["D", "d"], ["E", "e"]]), "root")
            .appendField(new Blockly.FieldDropdown([["Major", "major"], ["Minor", "minor"]]), "quality")
            .appendField("for")
            .appendField(new Blockly.FieldNumber(1, 1, 8), "beat")
            .appendField("beat(s)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

        this.setOutput(false);
        this.setColour(160);
    }
};

Blockly.JavaScript['mq_chord'] = function (block) {
    const dropdown_root = block.getFieldValue('root');
    const dropdown_quality = block.getFieldValue('quality');
    const number_beat = block.getFieldValue('beat');
    const sampler = block.getTopStackBlock().getFieldValue('instrument');
    let start = 0;
    let prev = block.getPreviousBlock();
    let prevBeat;
    if (prev) {
        prevBeat = prev.getFieldValue('beat');
        if (prevBeat) {
            start = prevBeat;
        }

    }
    //console.log(block.getTopStackBlock().getDescendants());
    let stack = block.getTopStackBlock().getDescendants();
    let count = 0;
    for (let i = 1; i < stack.length; i++) {
        count = count + stack[i].getFieldValue('beat');
    }
    // try {
    //     if (block.type == 'mq_chord' && block.getPreviousBlock().type == 'mq_chord') {
    //         let assigned_beat = block.getPreviousBlock().getFieldValue('beat');
    //         time = assigned_beat + number_beat;
    //         console.log(time);
    //     }
    // } catch (e) { console.log(e); }


    let code;

    if (dropdown_root == 'c' && dropdown_quality == 'major') {
        //code = `${sampler}.triggerAttackRelease(['C3', 'E3', 'G3'], ${number_beat});\n`
        code = `${sampler}.triggerAttack(['C3', 'E3', 'G3'], '+${start}');
        ${sampler}.triggerRelease(['C3', 'E3', 'G3'], '+${start + number_beat}');\n`
    } else if (dropdown_root == 'd' && dropdown_quality == 'major') {
        // code = `${sampler}.triggerAttackRelease(['D3', 'F#3', 'A3'], ${number_beat});\n`
        code = `${sampler}.triggerAttack(['D3', 'F#3', 'A3'], '+${start}');
        ${sampler}.triggerRelease(['D3', 'F#3', 'A3'], '+${start + number_beat}');\n`
    } else if (dropdown_root == 'e' && dropdown_quality == 'major') {
        // code = `${sampler}.triggerAttackRelease(['E3', 'G#3', 'B3'], ${number_beat});\n`
        code = `${sampler}.triggerAttack(['E3', 'G#3', 'B3'], '+${start}');
        ${sampler}.triggerRelease(['E3', 'G#3', 'B3'], '+${start + number_beat}');\n`
    }

    return code;
};