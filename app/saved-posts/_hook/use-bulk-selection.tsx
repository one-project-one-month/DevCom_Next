import { useCallback, useEffect, useMemo, useState } from "react";

export function useBulkSelection<TId extends string>(postIds: TId[]) {
  const [selectedIds, setSelectedIds] = useState<Set<TId>>(() => new Set());

  useEffect(() => {
    setSelectedIds(new Set());
  }, [postIds]);

  const { isAllSelected, isSomeSelected, selectedCount } =
    useMemo(() => {
      let count = 0;

      postIds.forEach((id) => {
        if (selectedIds.has(id)) count += 1;
      });

      const all  = postIds.length > 0 && count === postIds.length;
      const some = count > 0 && !all;

      return {
        selectedCount: count,
        isAllSelected: all,
        isSomeSelected: some,
      };
    }, [postIds, selectedIds]);

  const isSelected = useCallback(
    (id: TId) => selectedIds.has(id),
    [selectedIds]
  );

  const setSelected = useCallback((id: TId, selected: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (selected) {
         next.add(id);
      }
      else {
         next.delete(id);
      }

      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedIds(() => new Set());
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(postIds));
  }, [postIds]);

  const toggleAll = useCallback(() => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      let count = 0;

      postIds.forEach((id) => {
        if (next.has(id)) count += 1;
      });

      const allCurrentlySelected = postIds.length > 0 && count === postIds.length;

      postIds.forEach((id) => {
        if (allCurrentlySelected) {
          next.delete(id);
        } else {
          next.add(id);
        }
      });

      return next;
    });
  }, [postIds]);

  return {
    selectedIds,
    isAllSelected,
    isSomeSelected,
    selectedCount,
    isSelected,
    setSelected,
    clearAll,
    selectAll,
    toggleAll,
  };
}
