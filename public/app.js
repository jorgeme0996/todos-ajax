// When the page load!!!
$(document).ready(function(){
    $.getJSON("/api/todos")
    .then(addTodos)
//Listener para cuando se aprieta la tecla enter
    $('#todoInput').keypress(function(event){
        if(event.which == 13){
            createTodo();
        }
    });

    $('.list').on('click', 'li', function(){
        updateTodo($(this))
    })

    $('.list').on('click','span', function(event){
        event.stopPropagation();
        deleteTodo($(this).parent());
    })
});

function deleteTodo (todo){
    var clickedId = todo.data('id');
    var deleteURL = '/api/todos/' + clickedId 
    $.ajax({
        method: 'DELETE',
        url: deleteURL
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    })
}

function addTodo (todo){
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>')
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed){
        newTodo.addClass("done")
    }
    $('.list').append(newTodo)
}

function addTodos(todos) {
    for(let i in todos){
        addTodo(todos[i])
    }
}

function createTodo(){
    var userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo){
        addTodo(newTodo);
        $('#todoInput').val('')
    })
    .catch(function(err){
        console.log(err);
    })
}

function updateTodo(todo){
    var clickedId = todo.data('id');
    var updateURL = '/api/todos/' + clickedId 
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateURL,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data('completed', isDone);
        console.log(todo);
    })
}