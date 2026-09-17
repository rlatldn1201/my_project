document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const columns = document.querySelectorAll('.column');

    // 1. 폼 제출 시 카드 추가
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const member = document.getElementById('member-name').value;
        const desc = document.getElementById('task-desc').value;
        const deadline = document.getElementById('task-deadline').value;

        createCard(member, desc, deadline);
        form.reset();
    });

    // 2. 카드 생성 로직
    function createCard(member, desc, deadline) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('draggable', 'true');

        // 마감일 확인 및 지났으면 빨간색(overdue) 클래스 추가
        if (isOverdue(deadline)) {
            card.classList.add('overdue');
        }

        card.innerHTML = `
            <div class="member">👤 ${member}</div>
            <div class="desc">${desc}</div>
            <div class="deadline">마감일: ${deadline}</div>
        `;

        // 드래그 이벤트 연결
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);

        // 기본적으로 '할 일' 컬럼에 추가
        document.querySelector('#todo .card-list').appendChild(card);
    }

    // 마감일 경과 체크 함수 (현재 날짜와 비교)
    function isOverdue(dateString) {
        if (!dateString) return false;
        const deadlineDate = new Date(dateString);
        deadlineDate.setHours(23, 59, 59, 999); // 그 날의 자정 직전으로 설정
        const today = new Date();
        return today > deadlineDate;
    }

    // 3. 드래그 앤 드롭 로직
    let draggedItem = null;

    function dragStart() {
        draggedItem = this;
        setTimeout(() => this.classList.add('dragging'), 0);
    }

    function dragEnd() {
        this.classList.remove('dragging');
        draggedItem = null;
        
        // 마감일 상태 재확인 (드롭 후 업데이트 가능성을 위해)
        const deadlineText = this.querySelector('.deadline').innerText.replace('마감일: ', '');
        if (isOverdue(deadlineText)) {
            this.classList.add('overdue');
        }
    }

    // 컬럼 영역에 드롭 이벤트 설정
    columns.forEach(column => {
        const cardList = column.querySelector('.card-list');

        column.addEventListener('dragover', (e) => {
            e.preventDefault(); // 기본 동작을 막아야 드롭이 가능함
            column.classList.add('drag-over');
        });

        column.addEventListener('dragleave', () => {
            column.classList.remove('drag-over');
        });

        column.addEventListener('drop', () => {
            column.classList.remove('drag-over');
            if (draggedItem) {
                // 완료된 경우 시각적 효과를 바꿀 수도 있음 (선택적)
                cardList.appendChild(draggedItem);
            }
        });
    });
});