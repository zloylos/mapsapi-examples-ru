function init() {
    var myMap = new ymaps.Map('map', {
            center: [56.399625, 36.71120],
            zoom: 7,
            controls: []
        }),
        /**
         * Создание мультимаршрута.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
         */
        multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: ["Москва", "Тверь"]
        }, {
            // Тип промежуточных точек, которые могут быть добавлены при редактировании.
            editorMidPointsType: "via",
            // В режиме добавления новых путевых точек запрещаем ставить точки поверх объектов карты.
            editorDrawOver: false
        }),
        buttonEditor = new ymaps.control.Button({
            data: {
                content: "Режим редактирования"
            },
            options: {
                maxWidth: 300
            }
        });

    buttonEditor.events.add("select", function () {
        /**
         * Включение режима редактирования.
         * В качестве опций может быть передан объет с полями:
         * addWayPoints - разрешает добавление новых путевых точек при клике на карту. Значение по умолчанию: false.
         * dragWayPoints - разрешает перетаскивание уже существующих путевых точек. Значение по умолчанию: true.
         * removeWayPoints - разрешает удаление путевых точек при двойном клике по ним. Значение по умолчанию: false.
         * dragViaPoints - разрешает перетаскивание уже существующих транзитных точек. Значение по умолчанию: true.
         * removeViaPoints - разрешает удаление транзитных точек при двойном клике по ним. Значение по умолчанию: true.
         * addMidPoints - разрешает добавление промежуточных транзитных или путевых точек посредством перетаскивания маркера, появляющегося при наведении курсора мыши на активный маршрут. Тип добавляемых точек задается опцией midPointsType. Значение по умолчанию: true
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml#editor
         */
        multiRoute.editor.start({
            addWayPoints: true,
            removeWayPoints: true
        });
    });
    buttonEditor.events.add("deselect", function () {
        // Выключение режима редактирования.
        multiRoute.editor.stop();
    });

    myMap.geoObjects.add(multiRoute);
    myMap.controls.add(buttonEditor);
}

ymaps.ready(init);