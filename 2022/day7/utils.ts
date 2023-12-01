export function getCommands(input: string) {
    input.split('\n').map(line => {

    })
}



export function getCommandLineType(line: string): ParsedLine {
    switch (true) {
        case line.startsWith(CD_CMD_STRING):
            return {
                type: Command.CD,
                value: line.replace(CD_CMD_STRING, '')
            }
        case line.startsWith('$ ls'):
            return {
                type: Command.LS,
                value: line.replace(CD_CMD_STRING, ''),
            };
        default:
            return {
                type: Command.StdOut,
                value: line.
                value:
            };
    }
}

type ParsedLine = {
    type: Command;
    name: string;
    value: string;
}

const CD_CMD_STRING = '$ cd'
const LS_CMD_STRING = '$ ls'

export const enum Command {
    CD,
    LS,
    StdOut,
}
