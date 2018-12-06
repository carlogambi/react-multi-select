import React from "react";
import PropTypes from "prop-types";

import Column from "./column/column";
import List from "./list/items_list";
import NoItems from "./items/no_items";
import SelectedItem from "./items/selected_item";
import SelectionStatus from "./selection_status/selection_status";
import { buildItemGrouping } from "./item_grouping_util";

const DestinationList = ({
  selectionStatusRenderer,
  selectedIds,
  clearAll,
  messages,
  selectedItems,
  itemHeight,
  height,
  unselectItems,
  selectedItemRenderer,
  noItemsRenderer,
  withGrouping
}) => {
  const SelectionStatusRenderer = selectionStatusRenderer;
  const updatedSelectedItems = withGrouping
    ? buildItemGrouping(selectedItems)
    : selectedItems;
  return (
    <Column>
      <SelectionStatusRenderer
        selected={selectedIds}
        clearAll={clearAll}
        clearAllMessage={messages.clearAllMessage}
        selectedMessage={messages.selectedMessage}
        noneSelectedMessage={messages.noneSelectedMessage}
      />
      <List
        items={updatedSelectedItems}
        itemHeight={itemHeight}
        height={height - 45}
        onClick={(event, id) => unselectItems([id])}
        renderer={selectedItemRenderer}
        noItemsRenderer={noItemsRenderer}
        noItemsMessage={messages.noItemsMessage}
      />
    </Column>
  );
};

DestinationList.propTypes = {
  selectionStatusRenderer: PropTypes.any,
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  clearAll: PropTypes.func,
  messages: PropTypes.object,
  selectedItems: PropTypes.array,
  itemHeight: PropTypes.number,
  height: PropTypes.number,
  unselectItems: PropTypes.func,
  selectedItemRenderer: PropTypes.any,
  noItemsRenderer: PropTypes.any,
  withGrouping: PropTypes.bool
};

DestinationList.defaultProps = {
  selectionStatusRenderer: SelectionStatus,
  selectedIds: [],
  messages: {},
  selectedItems: [],
  itemHeight: 40,
  height: 400,
  selectedItemRenderer: SelectedItem,
  noItemsRenderer: NoItems,
  withGrouping: false
};

export default DestinationList;
