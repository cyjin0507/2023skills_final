if (!window.indexedDB) {
    window.alert("browser doesn't support IndexedDB")
} else {
    var db;
    var request = window.indexedDB.open('myDataBase');
    
    // 새로만들거나 버전이 높을때만 발생하는 이벤트 
    // ObjectStroe를 만들거나 수정할때 이 이벤트내에서 진행
    // onsuccess는 이 이벤트가 끝나면 발생됩니다.
    request.onupgradeneeded = function(event) {
    	var db = event.target.result;
        // person 이라는 이름으로 ObjectStore를 만듬, key를 따로 만들지 않고 자동생성함.
        var objectStore = db.createObjectStore('person', {keyPath: 'id'});
    }
    request.onerror = function(event) {
    	alert('failed');
    }
    request.onsuccess = function(event) {
    	db = this.result;
    }
}

function writeIndexedDB(people) {
    var request = window.indexedDB.open('myDataBase');
    
    request.onerror = function(event) {
    	alert('Database error: ' + event.target.errorCode);
    }
    request.onsuccess = function(event) {
    	var db = this.result;
    	// person ObjectStore에 readwrite(읽기,쓰기) 권한으로 Transaction 생성
    	var transaction = db.transaction(['person'], 'readwrite');
        
        // 완료 및 실패 이벤트 제어
        transaction.oncomplete = function(event) {
        	console.log('done');
        }
        transaction.onerror = function(event) {
        	console.log('fail');
        }
        
        var objectStore = transaction.objectStore('person');
        for(var person of people) {
            console.log(person);
            // var request = objectStore.add(person);
            request.onsuccess = function(event) {
            	console.log(event.target.result);
            }
        }
    }
}

function selectAllIndexedDB() {
    var request = window.indexedDB.open('myDataBase');
    
    request.onerror = function(event) {
    	console.log(event.target.errorCode);
    }
    request.onsuccess = function(event) {
    	var db = this.result;
        var transaction = db.transaction(['person']);
        
        transaction.onerror = function(event) {
        	console.log('fail');
        }
        transaction.oncomplete = function(event) {
        	console.log('done');
        }
        
        var objectStore = transaction.objectStore('person');
        var request = objectStore.openCursor();
        request.onsuccess = function(event) {
        	var cursor = event.target.result;
            if(cursor) {
            	request = objectStore.get(cursor.key);
                request.onsuccess = function(event) {
                	console.log(event.target.result);
                }
                cursor.continue();
            }
        }
    }
}

function deleteIndexedDB(key) {
	var request = window.indexedDB.open('myDataBase');
    
    request.onerror = function(event) {
    	alert(event.target.errorCode);
    }
    request.onsuccess = function(event) {
    	var db = this.result;
        var transaction = db.transaction(['person'], 'readwrite');
        
        transaction.onerror = function(event) {
        	console.log('fail');
        }
        transaction.onsuccess = function(evnet) {
        	console.log('done');
        }
        
        var objectStore = transaction.objectStore('person');
        var deleteReqeust = objectStore.delete(key);
        deleteReqeust.onsuccess = function(event) {
        	console.log('deleted');
        }
    }
}

deleteIndexedDB(1)

selectAllIndexedDB()
 
var people = [{
                  id: 1
                , name: 'Aiden'
                , age: 25
                , height: 178
              },
              {
              	  id: 2
                , name: 'Matthew'
                , age: 22
                , height: 182
              },
              {
              	  id: 3
                , name: 'John'
                , age: 26
                , height: 174
              }];
 
writeIndexedDB(people);








// 
var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     console.log(reader.result);
   };