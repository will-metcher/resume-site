const CARDS = {
    'Shadowflame': {
        'attack': 4,
        'health': 4,
        'faction': 'Dragon',
        'type': 'minion',
    },
    'Firebrand': {
        'attack': 3,
        'health': 3,
        'faction': 'Dragon',
        'type': 'minion',
    },
    'Sunchaser': {
        'attack': 3,
        'health': 3,
        'faction': 'Dragon',
        'type': 'minion',
    }
}

$('.play-card').each(function () {
    if ($(this).parent().hasClass('bench')) {
        $(this).draggable({
            'containment': '#game',
            'revert': true,
            start: function () {
                // scale the card up to 1.3x
                $(this).css('transform', 'scale(1.3)');
            },
            stop: function () {
                // reset scale to 1x
                $(this).css('transform', 'scale(1)');
            }
        });
    }

    updateImages();
});

$('.play-area').droppable({
    drop: function (event, ui) {
        if (ui.draggable.data('side') === $(this).data('side')) {
            this.appendChild(ui.draggable[0]);
            ui.draggable.draggable('disable');
            updateImages();
        } else {
            // revert
            ui.draggable.draggable('option', 'revert', true);
        }
    }
});

function updateImages() {
    $('.play-card').each(function () {
        if ($(this).data('card')) {
            let suffix = $(this).parent().hasClass('bench') ? 'card' : 'portrait';
            $(this).css('background-image', `url(imgs/${$(this).data('card')}-${suffix}.png)`);
        }
    });
}