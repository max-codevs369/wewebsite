      const firebaseConfig = {
        apiKey: "AIzaSyA5bKuYtkNoXAYctjZEx2KPMK5stJsXdtE",
        authDomain: "xii-rpl-51ead.firebaseapp.com",
        databaseURL: "https://xii-rpl-51ead-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "xii-rpl-51ead",
        storageBucket: "xii-rpl-51ead.firebasestorage.app",
        messagingSenderId: "261631605772",
        appId: "1:261631605772:web:314cd43ac8836954434229",
        measurementId: "G-DM208RWP4D"
      };

      firebase.initializeApp(firebaseConfig);
      const db = firebase.database();

      (function() {
        const form = document.getElementById('messageForm');
        const container = document.getElementById('messageContainer');
        const emptyState = document.getElementById('emptyState');
        const msgIn = document.getElementById('message');
        const commentCountEl = document.getElementById('commentCount');
        const visitorCountEl = document.getElementById('visitorCount');

        const visitorRef = db.ref('visitors_online');
        const myPresenceRef = visitorRef.push();

        db.ref('.info/connected').on('value', (snap) => {
          if (snap.val() === true) {
            myPresenceRef.set(true);
            myPresenceRef.onDisconnect().remove();
          }
        });

        visitorRef.on('value', (snap) => {
          const count = snap.numChildren();
          visitorCountEl.innerText = count.toLocaleString('id-ID');
        });

        const messagesRef = db.ref('messages');

        messagesRef.on('value', (snapshot) => {
          container.innerHTML = ''; 
          const data = snapshot.val();
          
          if (data) {
            if(emptyState) emptyState.style.display = 'none';
            const msgArray = Object.values(data).reverse();
            msgArray.forEach(msg => renderRaw(msg, false));
            commentCountEl.innerText = msgArray.length;
          } else {
            if(emptyState) emptyState.style.display = 'block';
            commentCountEl.innerText = "0";
          }
        });

        form.addEventListener('submit', function(e) {
          e.preventDefault();
          const t = msgIn.value.trim();
          
          if(t) {
            const randomNum = Math.floor(Math.random() * 900) + 100; 
            const autoName = "Anonim" + randomNum;

            const sekarang = new Date();
            
            const hari = sekarang.toLocaleDateString('id-ID', { weekday: 'short' });
            
            const tglBln = sekarang.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
            
            const jam = sekarang.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(/\./g, ':');

            const waktuLengkap = `${hari}, ${tglBln} ${jam}`;

            const newMsg = {
              sender: autoName, 
              text: t,
              color: ['#3B82F6', '#6366F1', '#8B5CF6', '#0EA5E9', '#2563EB'][Math.floor(Math.random()*5)],
              date: waktuLengkap, 
              timestamp: Date.now()
            };
            
            messagesRef.push(newMsg);
            
            msgIn.value = '';
            container.scrollTop = 0;
          }
        });

        function renderRaw(msg, isNew) {
          const div = document.createElement('div');
          div.className = "w-full p-5 flex gap-4 border-b border-blue-100 dark:border-blue-900/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors";

          const safeS = msg.sender;
          const safeT = msg.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

          div.innerHTML = `
            <div class="shrink-0">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md" style="background-color: ${msg.color};">
                ${safeS.substring(6)}
              </div>
            </div>
            <div class="flex-1 min-w-0 w-0">
              <div class="flex items-center justify-between mb-1 gap-4">
                <h4 class="font-bold text-sm text-dark dark:text-white truncate">${safeS}</h4>
                <span class="text-[10px] text-gray-500 dark:text-white font-mono whitespace-nowrap shrink-0">${msg.date}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-white leading-relaxed break-words break-all whitespace-pre-wrap">${safeT}</p>
            </div>`;

          container.appendChild(div);
        }
      })();