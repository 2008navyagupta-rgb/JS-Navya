let message = alert("Welcome to Navya's JS webpage");
   console.log(message);

//dark mode
        let modeBtn = document.querySelector("#mode");
let body = document.querySelector("body");
let currMode = "light"; //dark

modeBtn.addEventListener("click", () => {
 if (currMode === "light") {
    currMode = "dark";
    body.classList.add("dark");
    body.classList.remove("light");
    mode.textContent = '☀️ Light Mode';
    document.body.classList.toggle("dark-mode");
 } else {
    currMode = "light",
    body.classList.add("light");
    body.classList.remove("dark");
    mode.textContent = '🌙 Dark Mode';
}
console.log(currMode);
})

        //random quote
        const quotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
            { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
            { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
            { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
            { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" }
        ];

        function generateQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            
            document.getElementById('quoteText').textContent = '"' + randomQuote.text + '"';
            document.getElementById('quoteAuthor').textContent = '- ' + randomQuote.author;
        }

        //click counter
        let counter = 0;

        function incrementCounter() {
            counter++;
            document.getElementById('counterDisplay').textContent = counter;
        }

        function resetCounter() {
            counter = 0;
            document.getElementById('counterDisplay').textContent = counter;
        }

        //live clock
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            document.getElementById('clockDisplay').textContent = hours + ':' + minutes + ':' + seconds;
        }
        setInterval(updateClock, 1000);
        updateClock();

        //form
        const contactForm = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;

            if (nameInput.value.trim().length < 2) {
                nameInput.classList.add('error');
                document.getElementById('nameError').classList.add('show');
                isValid = false;
            } else {
                nameInput.classList.remove('error');
                document.getElementById('nameError').classList.remove('show');
            }
            console.dir(nameInput);

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                emailInput.classList.add('error');
                document.getElementById('emailError').classList.add('show');
                isValid = false;
            } else {
                emailInput.classList.remove('error');
                document.getElementById('emailError').classList.remove('show');
            }
            console.dir(emailInput)

            if (messageInput.value.trim().length < 10) {
                messageInput.classList.add('error');
                document.getElementById('messageError').classList.add('show');
                isValid = false;
            } else {
                messageInput.classList.remove('error');
                document.getElementById('messageError').classList.remove('show');
            }
            console.dir(messageInput)

            if (isValid) {
                document.getElementById('successMsg').classList.add('show');
                contactForm.reset();
                
                setTimeout(function() {
                    document.getElementById('successMsg').classList.remove('show');
                }, 3000);
            }
        });

        //to do list
        let todos = [];

        function loadTodos() {
            const saved = localStorage.getItem('todos');
            if (saved) {
                todos = JSON.parse(saved);
                renderTodos();
            }
        }

        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function addTodo() {
            const input = document.getElementById('todoInput');
            const task = input.value.trim();
            
            if (task !== '') {
                todos.push({
                    id: Date.now(),
                    task: task
                });
                
                input.value = '';
                saveTodos();
                renderTodos();
            }
        }

        function deleteTodo(id) {
            todos = todos.filter(function(todo) {
                return todo.id !== id;
            });
            
            saveTodos();
            renderTodos();
        }

        function renderTodos() {
            const list = document.getElementById('todoList');
            
            if (todos.length === 0) {
                list.innerHTML = '<li class="empty-state">No tasks yet. Add one above!</li>';
                return;
            }
            
            list.innerHTML = '';
            
            todos.forEach(function(todo) {
                const li = document.createElement('li');
                li.className = 'todo-item';
                li.innerHTML = '<span>' + todo.task + '</span><button class="delete-btn" onclick="deleteTodo(' + todo.id + ')">Delete</button>';
                list.appendChild(li);
            });
        }

        document.getElementById('todoInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
        loadTodos();
