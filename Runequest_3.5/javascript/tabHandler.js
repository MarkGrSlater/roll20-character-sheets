const buttonlist = ["attributes","combat","skills","equipment","spirit","divine","dragon","sorcery","devices"];
buttonlist.forEach(button => {
    on(`clicked:${button}`, function() {
        setAttrs({
            sheetTab: button
        });
    });
});