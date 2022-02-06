const draggable_list = document.getElementById('draggable-list');
            const check = document.getElementById('check');
            const sexyLadies = [
                'Jania',
                'Nao',
                'Mitsugu',
                'Mika',
                'Olga',
                'Kan-u',
                'Nel',
                'Matsumoto',
                'Yoruichi',
                'Kallen'
            ];
            //store list items
            const listItems = [];

            let dragStartIndex;

            createList();
            addEventListeners();

            
            //Instert List Items into DOM
            function createList(){
                //spread operator also copies array under hood
                [...sexyLadies]
                .map(a => ({value: a, sort: Math.random()}))
                .sort((a ,b) => a.sort - b.sort)
                .map(a => a.value)
                .forEach((person, index) => {
                    const listItem = document.createElement('li');

                    listItem.setAttribute('data-index', index);

                    listItem.innerHTML= `
                    <span class='number'>${index + 1}</span>
                    <div class ='draggable' draggable='true'>
                        <p class='person-name'>${person}</p>
                        <i class='fas fa-grip-lines'></i>
                    </div>
                    `;

                    listItems.push(listItem);

                    draggable_list.appendChild(listItem);
                });
            }

            function dragStart(){
                //The +symbol in front of this concats this into a number.
                dragStartIndex = +this.closest('li').getAttribute('data-index');
            };
            
            function dragOver(e){
                e.preventDefault();
            };

            function dragEnter(){
                this.classList.add('over')

            };

            function dragDrop(){
                const dragEndIndex = +this.getAttribute('data-index');
                swapItems(dragStartIndex, dragEndIndex);

                this.classList.remove('over');
            };

            function dragLeave(){
                this.classList.remove('over')
            };

            function swapItems(fromIndex, toIndex){
                const itemOne = listItems[fromIndex].querySelector('.draggable');
                const itemTwo = listItems[toIndex].querySelector('.draggable');
                console.log(fromIndex, toIndex);

                listItems[fromIndex].appendChild(itemTwo);
                listItems[toIndex].appendChild(itemOne);
            };
            //check order of list items
            function checkOrder(){
                console.log('ass');
                listItems.forEach((listItem, index) => {
                    const ladyName = listItem.querySelector('.draggable')
                    .innerText.trim();

                    if(ladyName !== sexyLadies[index]){
                      listItem.classList.add('wrong');  
                    } else{
                        listItem.classList.remove('wrong');
                        listItem.classList.add('right');
                    }
                })
            };

            function addEventListeners() {
                const draggables = document.querySelectorAll('.draggable');
                const dragListItems = document.querySelectorAll('.draggable-list li');
              
                draggables.forEach(draggable => {
                  draggable.addEventListener('dragstart', dragStart);
                });
              
                dragListItems.forEach(item => {
                  item.addEventListener('dragover', dragOver);
                  item.addEventListener('drop', dragDrop);
                  item.addEventListener('dragenter', dragEnter);
                  item.addEventListener('dragleave', dragLeave);
                });
              }

              check.addEventListener('click', checkOrder);
            