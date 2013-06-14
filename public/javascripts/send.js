/*
 * Used for sending files.
 */

// xshare
var xs = xs || {};


// file selector
xs.fileField = document.getElementById('sendFile');
// output 
xs.outputField = document.getElementById('selectedList');
// send or receive
xs.actButton = document.getElementById('actButton');
// file to send
// TODO: just handle one file for now
xs.selectedFile = null;

/*
 * Update the description for files selected dynamically.
 */
xs.fileField.addEventListener('change', function(evt) {
    var files = evt.target.files;
    if (files.length === 0) {
        xs.outputField.innerHTML = "<ul></ul>";
        xs.actButton.innerHTML = "Receive";
        return;
    }

    output = [];
    for (var idx = 0, size = files.length; idx < size; idx++) {
        f = files[idx];
        xs.selectedFile = {};
        // only the following properties are common
        properties = ['name', 'type', 'size', 'lastModifiedDate'];
        for (var i = 0, s = properties.length; i < s; i++) {
            var prop = properties[i];
            xs.selectedFile[prop] = f[prop];
        }

        results = "";
        // for (var k in f) {
        for (var k in xs.selectedFile) {
            results += (k + " : " + f[k]);
            results += "<br/>";
        }
        output.push('<li>' + results + '</li>');
    }
    xs.outputField.innerHTML = '<ul>' + output.join('') + "</ul>";
    xs.actButton.innerHTML= "Send";
}, false);

xs.trySend = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/send', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        // Now it's ready
        // TODO: what's next
        if (xhr.status === 200) {
            alert(xhr.responseText);
        } else {
            alert("SOMEHOW FAILED");
        }
    };
    xhr.send("HELLO WORLD");
};

xs.tryReceive = function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/test', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) {
            return;
        }
        // Now it's ready
        // TODO: what's next
        if (xhr.status === 200) {
            alert("HERE IT IS: " + xhr.responseText);
        } else {
            alert("SOMEHOW FAILED?");
        }
    };
    xhr.send();
};


/*
 * Init
 */
if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    // Check for the various File API support.
    alert('The File APIs are not fully supported in this browser.');
} else if (!window.XMLHttpRequest) {
    alert("Your browser doesn't support AJAX.");
} else {
    // All APIs supported
    xs.actButton.onclick = function() {
        if (xs.selectedFile === null) {
            xs.tryReceive();
        } else {
            xs.trySend();
        }
    };
}