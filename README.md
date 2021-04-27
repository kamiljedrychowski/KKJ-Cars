Commands:
```
npm install
npm run
npm test
```

Polecam dodać do keybindings.json (Ctrl+Shift+P > Open Keyboard Shortcuts (json)):

```
// Jak klikniecie F1 to się testy odpalą, jak klikniecie F2 to sie program odpali (w konsoli)
{
    "key": "f1",
    "command": "workbench.action.terminal.sendSequence",
    "args": {
        "text": "npm test\n"
    }
},
{
    "key": "f2",
    "command": "workbench.action.terminal.sendSequence",
    "args": {
        "text": "npm start\n"
    }
},
```