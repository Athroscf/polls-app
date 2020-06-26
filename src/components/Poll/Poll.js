import React from 'react';
// import Label from '@material-ui/core/InputLabel';

import Typography from '@material-ui/core/Typography';
import Label from '@material-ui/core/InputLabel'
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButton from '../UI/RadioButton/RadioButton';
import Button from '../UI/Button/Button';
import classes from './Poll.css';

// Component to be set dynamically in the future.
// Left static at the moment.

const poll = ( props ) => {
    return (
        <div className={classes.Poll}>
            <Typography variant="h5" className={classes.Typography}>
                Encuesta: { props.questions.pollName }
            </Typography>
            <form onSubmit={ props.handleSubmit }>
                <Label htmlFor='firstQuestion'>{ props.questions.first }</Label>
                <RadioGroup className={classes.RadioGroup}>
                    <div className={classes.RadioButton}>
                        <RadioButton name='first' content="Si" value='Si' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='first' content="No" value='No' onChange={this.handleChange}/>
                    </div>
                </RadioGroup>
                <Label htmlFor='firstQuestion'>{ props.questions.second }</Label>
                <RadioGroup className={classes.RadioGroup}>
                    <div className={classes.RadioButton}>
                        <RadioButton name='second' content="Accion" value='Accion' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='second' content="Deportes" value='Deportes' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='second' content="Estrategia" value='Estrategia' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='second' content="Otros" value='Otros' onChange={this.handleChange}/>
                    </div>
                </RadioGroup>
                <Label htmlFor='firstQuestion'>{ props.questions.third }</Label>
                <RadioGroup className={classes.RadioGroup}>
                    <div className={classes.RadioButton}>
                        <RadioButton name='third' content="0-1 hora" value='0-1' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='third' content="1-3 horas" value='1-3' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='third' content="3-5 horas" value='3-5' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='third' content="Mas de 5 horas" value='>5' onChange={this.handleChange}/>
                    </div>
                </RadioGroup>
                <Label htmlFor='firstQuestion'>{ props.questions.fourth }</Label>
                <RadioGroup className={classes.RadioGroup}>
                    <div className={classes.RadioButton}>
                        <RadioButton name='fourth' content="Si" value='Si' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='fourth' content="No" value='No' onChange={this.handleChange}/>
                    </div>
                </RadioGroup>
                <Label htmlFor='firstQuestion'>{ props.questions.fifth }</Label>
                <RadioGroup className={classes.RadioGroup}>
                    <div className={classes.RadioButton}>
                        <RadioButton name='fifth' content="$0-50" value='0-50' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='fifth' content="$50-100" value='50-100' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='fifth' content="$100-1000" value='100-1000' onChange={this.handleChange}/>
                    </div>
                    <div className={classes.RadioButton}>
                        <RadioButton name='fifth' content="Mas de $1000" value='>1000' onChange={this.handleChange}/>
                    </div>
                </RadioGroup>
                <Button type="submit" content="Responder Encuesta"/>
            </form>
        </div>
    )
}

export default poll;
