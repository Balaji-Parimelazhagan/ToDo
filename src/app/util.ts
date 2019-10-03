export class Util {

    /**
     * Retrieves the element either by class name or id.
     *
     * @param element, It is element which has to be get.
     */
    public static retrieveElementbyIdOrClass(element) {
        return document.querySelector(element);
    }

    /**
     * Sets the attribute for the given element with coressponding attribute and name.
     *
     * @param element, It is the element for which the attribute has to
     * be set.
     * @param attribute, It is the attribute which has to be set for the
     * element.
     * @param  attributeName, It is the name of attribute.
     */
    public static setAttributeForElemenet(element, attribute, attributeName) {
        return element.setAttribute(attribute, attributeName);
    }

    /**
     * Generates the id which is unique for all instance.
     */
    public static generateId() {
        return Date.now();
    }

    /**
     * Validates the given name, checks whether the name is already present.
     * If the name is already present, then it appends a integer within brackets
     * to the name. The integer will be increased as the dupicate increases.
     *
     * @param  rawName, It is name that should be validated.
     * @param  criteria, It is the string that denotes whether the
     * validation is for list or task or step.
     *
     validateName(rawName, criteria) {
        let duplicateNames = [];
        if ('list' === criteria) {
            duplicateNames = collectionOfList.filter(list => list.name === rawName);
        } else if ('task' === criteria) {
            const activeList = collectionOfList.find(list => list.id === activeListId);
            duplicateNames = activeList.tasks.filter(task => task.name === rawName);
        } else if ('step' === criteria) {
            const activeTask = retrieveTask(activeTaskId);
            duplicateNames = activeTask.steps.filter(step => step.name === rawName);
        }
        const duplicatesCount = duplicateNames.length;
        if (0 !== duplicatesCount) {
            return ' (' + duplicatesCount + ')';
        } else {
            return '';
        }
    }*/
}
