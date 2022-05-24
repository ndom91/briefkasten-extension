<script>
    import {getCurrentWord, getCurrentWordBounds} from "../util";

    export let id;
    export let name;
    export let value;
    export let tags;

    let isFocus = false;
    let isOpen = false;
    let input = null;

    let suggestions = [];
    let selectedIndex = 0;

    function handleFocus() {
        isFocus = true;
    }

    function handleBlur() {
        isFocus = false;
        close();
    }

    function handleInput(e) {
        input = e.target;

        const word = getCurrentWord(input);

        suggestions = word ? tags.filter(tag => tag.name.indexOf(word) === 0) : [];

        if (word && suggestions.length > 0) {
            open();
        } else {
            close();
        }
    }

    function handleKeyDown(e) {
        if (isOpen && (e.keyCode === 13 || e.keyCode === 9)) {
            const suggestion = suggestions[selectedIndex];
            complete(suggestion);
            e.preventDefault();
        }
        if (e.keyCode === 27) {
            close();
            e.preventDefault();
        }
        if (e.keyCode === 38) {
            updateSelection(-1);
            e.preventDefault();
        }
        if (e.keyCode === 40) {
            updateSelection(1);
            e.preventDefault();
        }
    }

    function open() {
        isOpen = true;
        selectedIndex = 0;
    }

    function close() {
        isOpen = false;
        suggestions = [];
        selectedIndex = 0;
    }

    function complete(suggestion) {
        const bounds = getCurrentWordBounds(input);
        const inputValue = input.value;
        value = `${inputValue.substring(0, bounds.start)}${suggestion.name}${inputValue.substring(bounds.end)} `;

        close();
    }

    function updateSelection(dir) {

        const length = suggestions.length;
        let newIndex = selectedIndex + dir;

        if (newIndex < 0) newIndex = Math.max(length - 1, 0);
        if (newIndex >= length) newIndex = 0;

        selectedIndex = newIndex;
    }
</script>

<div class="w-full">
    <!-- autocomplete input container -->
    <div class:is-focused={isFocus}>
        <!-- autocomplete real input box -->
        <input id="{id}" name="{name}" autofocus
               class="w-full border-2 border-slate-300 p-1 rounded-md focus:outline-none outline-none focus:ring-2 focus:ring-slate-300" type="text" autocomplete="off"
               bind:value={value}
               on:input={handleInput} on:keydown={handleKeyDown}
               on:focus={handleFocus} on:blur={handleBlur}>
    </div>

    <!-- autocomplete suggestion list -->
    <ul class="mt-2 flex flex-wrap space-x-2" class:open={isOpen && suggestions.length > 0}>
        <!-- menu list items -->
        {#each suggestions as tag,i}
            <li class="text-sm rounded-md px-2 py-1 bg-slate-300 text-slate-800 flex justify-center items-center" class:selected={selectedIndex === i}>
                <a href="#" on:mousedown|preventDefault={() => complete(tag)}>
                    {tag.emoji ? tag.emoji : ''} {tag.name}
                </a>
            </li>
        {/each}
    </ul>
</div>

