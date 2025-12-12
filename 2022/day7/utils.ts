export function getCommands(input: string) {
    input.split('\n').map(line => {});
}

export function getCommandLineType(line: string): ParsedLine {
    switch (true) {
        case line.startsWith(CD_CMD_STRING):
            return {
                type: Command.CD,
                name: CD_CMD_STRING,
                value: line.replace(CD_CMD_STRING, ''),
            };
        case line.startsWith(LS_CMD_STRING):
            return {
                name: LS_CMD_STRING,
                type: Command.LS,
                value: line.replace(CD_CMD_STRING, ''),
            };
        default:
            return {
                name: '',
                type: Command.StdOut,
                value: line,
            };
    }
}

type ParsedLine = {
    type: Command;
    name: string;
    value: string;
};

const CD_CMD_STRING = '$ cd';
const LS_CMD_STRING = '$ ls';

export const enum Command {
    CD,
    LS,
    StdOut,
}
