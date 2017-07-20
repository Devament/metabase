/* @flow */

import React, { Component } from "react";
import { connect } from "react-redux";

import FieldSearchInput from "metabase/containers/FieldSearchInput";
import RemappedValue from "metabase/containers/RemappedValue";

import { getMetadata } from "metabase/selectors/metadata";

import type { FieldId } from "metabase/meta/types/Field";

type Props = {
    value: any,
    setValue: () => void,

    isEditing: bool,

    fieldId: FieldId,
};

type State = {
    focused: bool,
};

const mapStateToProps = (state) => ({
    metadata: getMetadata(state)
})

@connect(mapStateToProps)
export default class SearchTextWidget extends Component<*, Props, State> {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            focused: false,
        };
    }

    static noPopover = true;

    static format(entityId, fieldId) {
        return <RemappedValue value={entityId} column={{ id: fieldId }} />
    }

    render() {
        // $FlowFixMe: metadata provided by @connect
        const { value, setValue, isEditing, fieldId, metadata } = this.props;
        const { focused } = this.state;

        if (!focused && value) {
            return (
                <div className="flex-full" onClick={() => this.setState({ focused: true })}>
                    {SearchTextWidget.format(value , fieldId)}
                </div>
            );
        } else {
            return (
                <FieldSearchInput
                    value={value}
                    onChange={setValue}
                    onFocus={() => this.setState({ focused: true })}
                    onBlur={() => this.setState({ focused: false })}
                    autoFocus={this.state.focused}
                    placeholder={isEditing ? "Enter a default value..." : "Enter a value..."}

                    field={metadata.fields[fieldId]}
                />
            )
        }
    }
}
